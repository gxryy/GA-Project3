import React from "react";
import { Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const AllDestinations = () => {
  const link = (name) => {
    window.open(
      `https://www.singaporeair.com/en_UK/nl/plan-travel/destinations/flights-to-${name}/`
    );
  };
  const itemData = [
    {
      img: "https://i.ibb.co/hW0prCS/Singapore.jpg",
      title: "Singapore",
    },
    {
      img: "https://i.ibb.co/3yws2z7/Dubai.jpg",
      title: "Dubai",
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
      img: "https://i.ibb.co/WFsnWKt/London.jpg",
      title: "London",
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
      img: "https://i.ibb.co/QQNsQ10/HongKong.jpg",
      title: "Hongkong",
    },
    {
      img: "https://i.ibb.co/dpZH8JN/Bangkok.jpg",
      title: "Bangkok",
    },
    {
      img: "https://i.ibb.co/N6wCMYn/Rome.jpg",
      title: "Rome",
    },
    {
      img: "https://i.ibb.co/ZhNyQ9h/Christchurch.jpg",
      title: "Christchurch",
    },
    {
      img: "https://i.ibb.co/ys1q4r0/Shanghai.jpg",
      title: "Shanghai",
    },
    {
      img: "https://i.ibb.co/qWzSJc1/Beijing.jpg",
      title: "Beijing",
    },
  ];
  return (
    <>
      <center>
        <Typography variant="h3">Where We Fly</Typography>
        <br />
        <br />
        <ImageList sx={{ width: 1010 }} cols={3}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}`}
                srcSet={`${item.img}`}
                alt={item.title}
                loading="lazy"
                onClick={() => link(item.title)}
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
        </ImageList>
      </center>
    </>
  );
};

export default AllDestinations;
