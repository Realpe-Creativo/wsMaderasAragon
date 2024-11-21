import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import './index.css'
import  router  from './router';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'

import i18n from './util/i18n';
import { LuConstruction } from 'react-icons/lu';

(async () => {
  await i18n.init({
    fallbackLng: 'es',
    debug: true,
  });
}
)()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider> */}
    <div className="flex w-[100vw] h-[100vh] flex-col justify-center items-center">
        <LuConstruction className="text-zinc-600 flex text-[5rem] w-fit" />
      <div className="flex justify-center items-center">
        <span className="text-zinc-600 text-[2rem] md:text-[4rem] text-center">
          <br />
          <br />
            El proyecto está en construcción
          </span>
      </div>

    </div>
  </React.StrictMode>,
)
