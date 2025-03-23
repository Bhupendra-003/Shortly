import { storeClicks } from "@/db/apiClick";
import { getLongUrl } from "@/db/apiUrl";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();
  const { loading, data, fn } = useFetch(getLongUrl, id);
  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    original_url: data?.original_url,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
      if (data?.longUrl) {
        window.location.href = data.longUrl;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data]);
  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }
  return null;
};
export default RedirectLink;