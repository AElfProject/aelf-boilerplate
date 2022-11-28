export { default } from 'page-components/Example';
import { NextPageContext } from 'next';
import { API } from 'constants/api';
import { get } from 'utils/axios';
export const getServerSideProps = async (ctx: NextPageContext) => {
  const autoData = await get(API.GET.BLOCK_HEIGHT);

  return {
    props: {
      datassr: autoData,
    },
  };
};
