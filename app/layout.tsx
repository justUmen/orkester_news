import { Providers } from "@/redux/provider";
import { Grid } from "@mui/material";
import LeftSideMenu from "./components/LeftSideMenu";

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <LeftSideMenu />
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
