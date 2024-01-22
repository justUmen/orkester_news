// "use client" //not necessary ??? (not in)
import { useState } from "react";

//Material-UI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Skeleton from "@mui/material/Skeleton";
import { NewsArticle } from "@/app/types/newsInterface";

export interface Prop {
  news: NewsArticle;
  index: number;
}

function CardNews({ news, index }: Prop) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: 545 },
        height: 530,
        margin: "auto",
        marginBottom: 2,
        position: "relative",
      }}
    >
      {!imageLoaded && <Skeleton variant="rectangular" height={240} />}
      <CardMedia
        component="img"
        height="240"
        image={news.urlToImage || ""}
        alt={news.title}
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? "block" : "none" }}
      />
      <CardContent
        sx={{ height: "calc(530px - 140px - 60px)", overflow: "auto" }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {news.title} - (index: {index})
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {news.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          position: "absolute",
          bottom: 0,
          width: "95%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 10px",
          height: "60px",
        }}
      >
        <Typography variant="body2">
          By {news.author || "Unknown"} on{" "}
          {new Date(news.publishedAt).toLocaleDateString()}
        </Typography>
        <Button variant="outlined" size="small">
          <Link
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
          >
            Read More
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardNews;
