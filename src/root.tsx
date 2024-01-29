import { Suspense } from 'solid-js';
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from 'solid-start';
import './root.css';

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <A href="/">Index</A>
            <br />
            <A href="/about">About</A>
            <br />
            <A href="/file-pick">file pick</A>
            <br />
            <A href="/slide">slide</A>
            <br />
            <A href="/map-render">map-render</A>
            <br />
            <A href="/decorator-component">decorator-component</A>
            <br />
            <A href="/component-as-function-prop">component-as-function-prop</A>
            <br />
            <A href="/events">events</A>
            <br />
            <A href="/element-append">element-append</A>
            <br />
            <hr />

            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
