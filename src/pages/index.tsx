import Banner from "@/Components/Banner";
import CelebList from "@/Components/CelebList/CelebList";
import axios from "axios";

export default function Home({ data }:{data:[]}) {
  return (
    <>
      <Banner></Banner>
      <CelebList list={data}></CelebList>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API

  const allCelebList = await axios.get(
    `https://x8ki-letl-twmt.n7.xano.io/api:mxGtNEgl/ccelebs`
  );
  
  const data = allCelebList.data

  // Pass data to the page via props
  return { props: { data } };
}
