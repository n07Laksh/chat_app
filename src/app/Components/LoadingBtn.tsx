import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
// import SaveIcon from "@mui/icons-material/Save";

interface ComponentProps {
  txt: string;
  icon?: React.ComponentType<any>;
  loading?: boolean;
  clickEvent: () => void | Promise<void>;
  customStyle?: any;
}

const LoadingButtons: React.FC<ComponentProps> = ({
  txt,
  icon: BtnIcon,
  loading,
  clickEvent,
  customStyle,
}) => {
  return (
    <>
      <LoadingButton
        loading={loading}
        loadingPosition="start"
        startIcon={BtnIcon ? <BtnIcon /> : ""}
        variant="outlined"
        onClick={clickEvent}
        sx={
          !customStyle
            ? {
                background: "var(--boxColor)",
                color: "var(--foreground)",
                "&.Mui-disabled": {
                  color: "white",
                },
              }
            : customStyle
        }
      >
        {txt}
      </LoadingButton>
    </>
  );
};

export default LoadingButtons;
