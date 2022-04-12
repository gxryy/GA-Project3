import React from "react";
import { Typography } from "@mui/material";import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const AllDestinations = () => {
  const itemData = [
    {
      img: "https://i.ibb.co/hW0prCS/Singapore.jpg",
      title: "Singapore",
    },
    {
      img: "https://i.ibb.co/48GPr1N/Kuala-Lumpur.jpg",
      title: "Kuala Lumpur",
    },
    {
      img: "https://i.ibb.co/8NvMj2V/Makassar.jpg",
      title: "Makkasar",
    },
    {
      img: "https://i.ibb.co/jwDqgGS/Male.jpg",
      title: "Male",
    },
    {
      img: "https://i.ibb.co/jzpBVfR/Tokyo.jpg",
      title: "Tokyo",
    },
    {
      img: "https://i.ibb.co/dp6sgL0/Osaka.jpg",
      title: "Osaka",
    },
    {
      img: "https://i.ibb.co/g3M2Rjn/Adelaide.jpg",
      title: "Adelaide",
    },
    {
      img: "https://i.ibb.co/fxSbBBd/Ahmedabad.jpg",
      title: "Ahmedabad",
    },
    {
      img: "https://i.ibb.co/9Z3rkHG/Amsterdam1.jpg",
      title: "Amsterdam",
    },
    {
      img: "https://i.ibb.co/RyVHRbF/Auckland1.jpg",
      title: "Auckland",
    },
    {
      img: "https://i.ibb.co/vdmxs22/Bali.jpg",
      title: "Bali",
    },
    {
      img: "https://i.ibb.co/MVn852F/Balikpapan.jpg",
      title: "Balikpapan",
    },
  ];
  return (
    <>
    <center>
        <Typography variant="h3">Where We Fly</Typography><br/><br/>
      <ImageList sx={{ width: 1010}} cols={3} >
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}`}
              srcSet={`${item.img}`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              title={item.title}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: "white" }}
                  aria-label={`${item.title}`}
                ></IconButton>
              }
              actionPosition="center"
            />
          </ImageListItem>
        ))}
      </ImageList></center>
    </>
  );
};

export default AllDestinations;
