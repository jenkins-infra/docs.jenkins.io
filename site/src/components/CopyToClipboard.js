import React, { useState } from "react";
import Button from "@mui/material/Button";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";

const CopyToClipboard = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500); // Reset copied state after 1.5 seconds
            })
            .catch((error) => console.error("Failed to copy:", error));
    };

    return (
        <Button
            onClick={copyToClipboard}
            variant="outlined"
            size="small"
            style={{
                marginLeft: "5px",
                border: "none",
                minWidth: "30px",
                minHeight: "30px",
                zIndex: "10",
            }}
            disabled={copied}
        >
            {copied ? (
                <DoneAllOutlinedIcon style={{ fontSize: "16px" }} />
            ) : (
                <ContentCopyOutlinedIcon style={{ fontSize: "16px" }} />
            )}
        </Button>
    );
};

export default CopyToClipboard;
