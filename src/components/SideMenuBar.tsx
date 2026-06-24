import React, { useEffect, useState } from "react";
import { toastError } from "./ErrorToast";
import { httpService } from "../httpService";
import { base64ToBlobUrl } from "../assets/imageToBlob";
import { Avatar, Box } from "@mui/material";
import { User } from "lucide-react";

function SideMenuBar() {
  const [imageUrl, setImageUrl] = useState("");
  const getData = async () => {
    try {
      const { data } = await httpService("cbt/avatar");

      const { avatar } = data;

      if (avatar) {
        const blobUrl = base64ToBlobUrl(avatar, "image/jpeg");
        if (blobUrl) setImageUrl(blobUrl);
      }
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 3,
        }}
      >
        <Avatar
          src={imageUrl}
          sx={{
            width: 160,
            height: 160,
            border: "4px solid",
            borderColor: "primary.main",
            boxShadow: 3,
          }}
        >
          <User size={80} />
        </Avatar>
      </Box>
    </div>
  );
}

export default SideMenuBar;
