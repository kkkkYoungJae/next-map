import { useRouter } from "next/router";

const StoreDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>StoreDetailPage {id} </div>;
};

export default StoreDetailPage;
