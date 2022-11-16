// pages/my-page/[[...]].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// 这里的子应用是用原生的html js写的，然后跑了个nginx代理使用

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
      <h1>子应用</h1>
      <Link href={`/micro-app/my-page`}>
        <a>my-page</a>
      </Link>
      <Link href={`/micro-app/my-page/page2`}>
        <a>my-page/page2</a>
      </Link>
      {!show && (
        <micro-app
          name="app1" // name(必传)：应用名称
          url="http://127.0.0.1:3616/" // url(必传)：应用地址，会被自动补全为http://localhost:3000/index.html
          baseroute="micro-app/my-page" // baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/my-page`
        ></micro-app>
      )}
      {show && (
        <micro-app
          name="app2" // name(必传)：应用名称
          url="http://127.0.0.1:3616/page2" // url(必传)：应用地址，会被自动补全为http://localhost:3000/index.html
          baseroute="micro-app/my-page/page2" // baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/my-page`
        ></micro-app>
      )}
    </div>
  );
};

export default MyPage;
