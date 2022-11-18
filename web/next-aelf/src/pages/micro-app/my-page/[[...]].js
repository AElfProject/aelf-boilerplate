// pages/my-page/[[...]].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// Child application written in original html&js with nginx proxy
const MyPage = () => {
  const [show, changeShow] = useState(false);
  const router = useRouter();
  useEffect(() => {
    console.log('router', router);
    if (router.asPath.match('page2')) {
      changeShow(true);
    } else {
      changeShow(false);
    }
  }, [router]);
  useEffect(() => {
    changeShow(true);
  }, []);

  return (
    <div>
      <h1>Child Application</h1>
      <Link href={`/micro-app/my-page`}>
        <a>my-page</a>
      </Link>
      <Link href={`/micro-app/my-page/page2`}>
        <a>my-page/page2</a>
      </Link>
      {!show && (
        <micro-app
          name="app1" // name(required)：app name
          url="http://127.0.0.1:3616/" // url(required): app url，autocomplete as: http://localhost:3000/index.html
          baseroute="micro-app/my-page" // baseroute(optional): base route assigned by the base application to the child application which is `/my-page`
        ></micro-app>
      )}
      {show && (
        <micro-app name="app2" url="http://127.0.0.1:3616/page2" baseroute="micro-app/my-page/page2"></micro-app>
      )}
    </div>
  );
};

export default MyPage;
