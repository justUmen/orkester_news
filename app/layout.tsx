import { Providers } from "@/redux/provider";

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body>
          {props.children}
        </body>
      </html>
    </Providers>
  );
}
