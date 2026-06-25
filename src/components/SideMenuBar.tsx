import React, { useEffect, useState } from "react";
import { toastError } from "./ErrorToast";
import { httpService } from "../httpService";
import { base64ToBlobUrl } from "../assets/imageToBlob";
import { Avatar, Box, Typography } from "@mui/material";
import { User } from "lucide-react";
import { useAppUser } from "../context/AppUserContext";
import { useActiveProgramme } from "../context/ActiveProgrammeContext";

function SideMenuBar() {
  const [imageUrl, setImageUrl] = useState("");
  const { user } = useAppUser();
  const { activeProgramme } = useActiveProgramme();
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
    <div className="">
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
      <Box
        sx={{
          mb: 3,
        }}
      >
        <Typography variant="caption">Name:</Typography>
        <Typography
          variant="h6"
          className=""
          sx={{
            fontWeight: 700,
            textTransform: "capitalize",
            wordBreak: "break-word",
          }}
        >
          {user?.name}
        </Typography>
      </Box>
      <Box
        sx={{
          mb: 3,
        }}
      >
        <Typography variant="caption">Examination Number:</Typography>
        <Typography
          variant="h6"
          className=""
          sx={{
            fontWeight: 700,
            textTransform: "uppercase",
            wordBreak: "break-word",
          }}
        >
          {user?.indexNumber}
        </Typography>
      </Box>
      <Box
        sx={{
          mb: 3,
        }}
      >
        <Typography variant="caption">School:</Typography>
        <Typography
          variant="h6"
          className=""
          sx={{
            fontWeight: 700,
            textTransform: "capitalize",
            wordBreak: "break-word",
          }}
        >
          {user?.school}
        </Typography>
      </Box>
      <Box
        sx={{
          mb: 3,
        }}
      >
        <Typography variant="caption">Active Programme:</Typography>
        <Typography
          variant="h6"
          className=""
          sx={{
            fontWeight: 700,
            textTransform: "capitalize",
            wordBreak: "break-word",
          }}
        >
          {activeProgramme?.name}
        </Typography>
      </Box>
    </div>
  );
}

export default SideMenuBar;
