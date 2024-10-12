import React from "react";
import { useTheme } from "@mui/material";

const IndexPageLayout = ({ children }) => {
    const theme = useTheme();

    return (
        <>
            <div
                style={{
                    margin: `0 auto`,
                    marginTop: theme.spacing(10),
                    marginBottom: theme.spacing(5),
                    maxWidth: 1500,
                    paddingLeft: theme.spacing(10),
                    paddingRight: theme.spacing(10),
                }}
            >
                {children}
            </div>
        </>
    );
};

export default IndexPageLayout;
