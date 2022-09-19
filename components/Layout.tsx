import { Container } from "@chakra-ui/react";
import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Container maxW="container.xl" className="main">
        {children}
      </Container>
      <Footer />
    </>
  );
}
