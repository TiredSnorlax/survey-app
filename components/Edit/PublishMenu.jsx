import { useState, useEffect } from 'react';
import style from '../../styles/Survey.module.css'
import {QRCodeSVG} from 'qrcode.react';

const PublishMenu = ({id, publishMenuOpen, setPublishMenuOpen}) => {
    const [copied, setCopied] = useState(false);
    const [link, setLink] = useState(null);

    useEffect(() => {
        setLink(window.location.origin + "/survey/" + id + "/do");
    }, [])


    const close = () => {
        setPublishMenuOpen(false);
        setCopied(false);
    }

    const copy = () => {
        navigator.clipboard.writeText(link).then(function() {
            setCopied(true);
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }
  return (
      <div>
        { publishMenuOpen &&
            <div className={style.menuContainer}>
                <div className={style.menu}>
                    <h1>Links to your survey</h1>
                    <h2>Remember to save your survey before sending it out!</h2>
                    <QRCodeSVG value={link} style={{ width: "80%", height: "auto" }} />
                    <p style={{ wordWrap: "break-word", width: "100%" }}>{link}</p>
                    <button className={`${style.copyBtn} ${copied ? style.copied : ""}`} onClick={copy}>{ copied ? "Copied" : "Copy" }</button>
                    <div>
                        <button onClick={close}>Close</button>
                    </div>
                </div>
            </div>
        }
        </div>
  )
}

export default PublishMenu