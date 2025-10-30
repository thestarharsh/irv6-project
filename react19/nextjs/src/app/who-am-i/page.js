import ClientPage from "./client";
import WhoAmI from "./whoAmI";

export default async function WhoAmIPage() {
  return (
    <ClientPage id={1}>
      <WhoAmI />
    </ClientPage>
  );
}
