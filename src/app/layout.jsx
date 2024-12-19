import { Inter } from "next/font/google";
import "./globals.css";
import HeaderPage from "@/components/header/header";
import { SubformLoginProvider } from "@/components/context/subformLoginContext";
import { AuthProvider } from "@/components/context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormProvider } from "@/components/context/frmNameContext";
import Footer from "@/components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SubformLoginProvider>
            <FormProvider>
              <HeaderPage></HeaderPage>

              <div className="container mx-auto px-36 bg-white mb-2">
                {children}
              </div>
            </FormProvider>
          </SubformLoginProvider>
          <Footer></Footer>
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
