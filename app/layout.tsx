import { Providers } from "@/redux/provider";
import { Grid } from "@mui/material";

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body>
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
