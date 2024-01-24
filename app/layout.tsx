import { Providers } from "@/redux/provider";
import { Grid, Typography } from "@mui/material";
import LeftSideMenu from "./components/LeftSideMenu";
import ShowTotalResults from "./components/ShowTotalResults";
import CurrentUser from "./components/CurrentUser";

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <LeftSideMenu />
          <ShowTotalResults />
          <Grid
            container
            justifyContent="center"
            style={{ marginTop: "40px" }}
          >
            {props.children}
          </Grid>
        </body>
      </html>
    </Providers>
  );
}
