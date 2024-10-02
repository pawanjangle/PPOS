import React, { useState, useEffect } from 'react'
import { Html5QrcodeScanner } from "html5-qrcode"
import {
    BrowserMultiFormatReader,
    NotFoundException,
    ChecksumException,
    FormatException,
    DecodeHintType,
    BarcodeFormat
} from "@zxing/library";


const ScannerComponent = () => {
    const [selectedDeviceId, setSelectedDeviceId] = useState("");
    const [code, setCode] = useState("");
    const [videoInputDevices, setVideoInputDevices] = useState([]);
    const hints = new Map();
    const formats = [
        BarcodeFormat.CODE_128,
        BarcodeFormat.DATA_MATRIX,
        BarcodeFormat.QR_CODE
    ];
    hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
    hints.set(DecodeHintType.TRY_HARDER, true);
    const codeReader = new BrowserMultiFormatReader(hints);

    console.log("ZXing code reader initialized");

    useEffect(() => {
        codeReader
            .getVideoInputDevices()
            .then((videoInputDevices) => {
                setupDevices(videoInputDevices);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    function setupDevices(videoInputDevices) {
        const sourceSelect = document.getElementById("sourceSelect");

        // selects first device
        setSelectedDeviceId(videoInputDevices[0].deviceId);

        // setup devices dropdown
        if (videoInputDevices.length >= 1) {
            setVideoInputDevices(videoInputDevices);
        }
    }

    function resetClick() {
        codeReader.reset();
        setCode("");
        console.log("Reset.");
    }

    function decodeContinuously(selectedDeviceId) {
        codeReader.decodeFromInputVideoDeviceContinuously(
            selectedDeviceId,
            "video",
            (result, err) => {
                if (result) {
                    // properly decoded qr code
                    console.log("Found QR code!", result);
                    setCode(result.text);
                }

                if (err) {
                    setCode("");
                    console.error(err);
                }
            }
        );
    }

    useEffect((deviceId) => {
        decodeContinuously(selectedDeviceId);
        console.log(`Started decode from camera with id ${selectedDeviceId}`);
    }, []);

    return (
        <main className="wrapper">
            <section className="container" id="demo-content">
                <div id="sourceSelectPanel">
                    <label htmlFor="sourceSelect">Change video source:</label>
                    <select
                        id="sourceSelect"
                        onChange={() => setSelectedDeviceId(sourceSelect.value)}
                    >
                        {videoInputDevices.map((element) => (
                            <option value={element.deviceId}>{element.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <video id="video" width="100%" height="720px" />
                </div>

                <label>Result:</label>
                <pre>
                    <code id="result">{code}</code>
                </pre>

                <button id="resetButton" onClick={() => resetClick()}>
                    Reset
                </button>
            </section>
        </main>
    )
}

export default ScannerComponent