export { default } from 'page-components/Example';
import { NextPageContext } from 'next';
import { API, BASE_URL } from 'constants/api';
import { getSSR } from 'utils/axios';
export const getServerSideProps = async (ctx: NextPageContext) => {
  const autoData = await getSSR(API.GET.BLOCK_HEIGHT);

  return {
    props: {
      //   datassr: JSON.parse(JSON.stringify(autoData)),
    },
  };
};
