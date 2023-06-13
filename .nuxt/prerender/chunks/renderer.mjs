import { createRenderer } from 'file:///Users/wangjunbin/projects/github-abinweb/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { eventHandler, setResponseStatus, getQuery, createError, appendResponseHeader } from 'file:///Users/wangjunbin/projects/github-abinweb/node_modules/h3/dist/index.mjs';
import { stringify, uneval } from 'file:///Users/wangjunbin/projects/github-abinweb/node_modules/devalue/index.js';
import { joinURL, withoutTrailingSlash } from 'file:///Users/wangjunbin/projects/github-abinweb/node_modules/ufo/dist/index.mjs';
import { renderToString } from 'file:///Users/wangjunbin/projects/github-abinweb/node_modules/vue/server-renderer/index.mjs';
import { u as useNitroApp, a as useRuntimeConfig, g as getRouteRules } from './nitro/nitro-prerenderer.mjs';
import 'file:///Users/wangjunbin/projects/github-abinweb/node_modules/node-fetch-native/dist/polyfill.mjs';
import 'file:///Users/wangjunbin/projects/github-abinweb/node_modules/ofetch/dist/node.mjs';
import 'file:///Users/wangjunbin/projects/github-abinweb/node_modules/destr/dist/index.mjs';
import 'file:///Users/wangjunbin/projects/github-abinweb/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///Users/wangjunbin/projects/github-abinweb/node_modules/hookable/dist/index.mjs';
import 'file:///Users/wangjunbin/projects/github-abinweb/node_modules/scule/dist/index.mjs';
import 'file:///Users/wangjunbin/projects/github-abinweb/node_modules/klona/dist/index.mjs';
import 'file:///Users/wangjunbin/projects/github-abinweb/node_modules/defu/dist/defu.mjs';
import 'file:///Users/wangjunbin/projects/github-abinweb/node_modules/ohash/dist/index.mjs';
import 'file:///Users/wangjunbin/projects/github-abinweb/node_modules/unstorage/dist/index.mjs';
import 'file:///Users/wangjunbin/projects/github-abinweb/node_modules/unstorage/drivers/fs.mjs';
import 'file:///Users/wangjunbin/projects/github-abinweb/node_modules/radix3/dist/index.mjs';

function defineRenderHandler(handler) {
  return eventHandler(async (event) => {
    if (event.node.req.url.endsWith("/favicon.ico")) {
      event.node.res.setHeader("Content-Type", "image/x-icon");
      event.node.res.end(
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      );
      return;
    }
    const response = await handler(event);
    if (!response) {
      if (!event.node.res.writableEnded) {
        event.node.res.statusCode = event.node.res.statusCode === 200 ? 500 : event.node.res.statusCode;
        event.node.res.end(
          "No response returned from render handler: " + event.node.req.url
        );
      }
      return;
    }
    const nitroApp = useNitroApp();
    await nitroApp.hooks.callHook("render:response", response, { event });
    if (!event.node.res.headersSent && response.headers) {
      for (const header in response.headers) {
        event.node.res.setHeader(header, response.headers[header]);
      }
      setResponseStatus(event, response.statusCode, response.statusMessage);
    }
    return typeof response.body === "string" ? response.body : JSON.stringify(response.body);
  });
}

const appRootId = "__nuxt";

const appRootTag = "div";

function buildAssetsURL(...path) {
  return joinURL(publicAssetsURL(), useRuntimeConfig().app.buildAssetsDir, ...path);
}
function publicAssetsURL(...path) {
  const publicBase = useRuntimeConfig().app.cdnURL || useRuntimeConfig().app.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
}

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const getClientManifest = () => import('./app/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getStaticRenderedHead = () => import('./rollup/_virtual_head-static.mjs').then((r) => r.default || r);
const getServerEntry = () => import('./app/server.mjs').then((r) => r.default || r);
const getSSRStyles = lazyCachedFunction(() => import('./app/styles.mjs').then((r) => r.default || r));
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    return `<${appRootTag} id="${appRootId}">${html}</${appRootTag}>`;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const options = {
    manifest,
    renderToString: () => `<${appRootTag} id="${appRootId}"></${appRootTag}>`,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig();
    ssrContext.payload = {
      _errors: {},
      serverRendered: false,
      data: {},
      state: {}
    };
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    ssrContext.renderMeta = ssrContext.renderMeta ?? getStaticRenderedHead;
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
const PAYLOAD_CACHE = /* @__PURE__ */ new Map() ;
const PAYLOAD_URL_RE = /\/_payload(\.[a-zA-Z0-9]+)?.json(\?.*)?$/ ;
const PRERENDER_NO_SSR_ROUTES = /* @__PURE__ */ new Set(["/index.html", "/200.html", "/404.html"]);
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.node.req.url?.startsWith("/__nuxt_error") ? getQuery(event) : null;
  if (ssrError && ssrError.statusCode) {
    ssrError.statusCode = parseInt(ssrError.statusCode);
  }
  if (ssrError && event.node.req.socket.readyState !== "readOnly") {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const islandContext = void 0;
  let url = ssrError?.url || islandContext?.url || event.node.req.url;
  const isRenderingPayload = PAYLOAD_URL_RE.test(url) && !islandContext;
  if (isRenderingPayload) {
    url = url.substring(0, url.lastIndexOf("/")) || "/";
    event.node.req.url = url;
    if (PAYLOAD_CACHE.has(url)) {
      return PAYLOAD_CACHE.get(url);
    }
  }
  const routeOptions = getRouteRules(event);
  const ssrContext = {
    url,
    event,
    runtimeConfig: useRuntimeConfig(),
    noSSR: event.context.nuxt?.noSSR || routeOptions.ssr === false || (PRERENDER_NO_SSR_ROUTES.has(url) ),
    error: !!ssrError,
    nuxt: void 0,
    /* NuxtApp */
    payload: ssrError ? { error: ssrError } : {},
    _payloadReducers: {},
    islandContext
  };
  const _PAYLOAD_EXTRACTION = !ssrContext.noSSR && !islandContext;
  const payloadURL = _PAYLOAD_EXTRACTION ? joinURL(useRuntimeConfig().app.baseURL, url, "_payload.json" ) : void 0;
  {
    ssrContext.payload.prerenderedAt = Date.now();
  }
  const renderer = ssrContext.noSSR ? await getSPARenderer() : await getSSRRenderer();
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (event.node.res.headersSent || event.node.res.writableEnded) {
    return;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response2 = renderPayloadResponse(ssrContext);
    {
      PAYLOAD_CACHE.set(url, response2);
    }
    return response2;
  }
  if (_PAYLOAD_EXTRACTION) {
    appendResponseHeader(event, "x-nitro-prerender", joinURL(url, "_payload.json" ));
    PAYLOAD_CACHE.set(withoutTrailingSlash(url), renderPayloadResponse(ssrContext));
  }
  const renderedMeta = await ssrContext.renderMeta?.() ?? {};
  const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? ssrContext._registeredComponents ?? []) ;
  const NO_SCRIPTS = routeOptions.experimentalNoScripts;
  const htmlContext = {
    island: Boolean(islandContext),
    htmlAttrs: normalizeChunks([renderedMeta.htmlAttrs]),
    head: normalizeChunks([
      renderedMeta.headTags,
      _PAYLOAD_EXTRACTION ? `<link rel="preload" as="fetch" crossorigin="anonymous" href="${payloadURL}">` : null ,
      NO_SCRIPTS ? null : _rendered.renderResourceHints(),
      _rendered.renderStyles(),
      inlinedStyles,
      ssrContext.styles
    ]),
    bodyAttrs: normalizeChunks([renderedMeta.bodyAttrs]),
    bodyPrepend: normalizeChunks([
      renderedMeta.bodyScriptsPrepend,
      ssrContext.teleports?.body
    ]),
    body: [_rendered.html],
    bodyAppend: normalizeChunks([
      NO_SCRIPTS ? void 0 : _PAYLOAD_EXTRACTION ? renderPayloadJsonScript({ id: "__NUXT_DATA__", ssrContext, data: splitPayload(ssrContext).initial, src: payloadURL })  : renderPayloadJsonScript({ id: "__NUXT_DATA__", ssrContext, data: ssrContext.payload }) ,
      routeOptions.experimentalNoScripts ? void 0 : _rendered.renderScripts(),
      // Note: bodyScripts may contain tags other than <script>
      renderedMeta.bodyScripts
    ])
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  const response = {
    body: renderHTMLDocument(htmlContext),
    statusCode: event.node.res.statusCode,
    statusMessage: event.node.res.statusMessage,
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
  return response;
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function normalizeChunks(chunks) {
  return chunks.filter(Boolean).map((i) => i.trim());
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  return chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html>
<html ${joinAttrs(html.htmlAttrs)}>
<head>${joinTags(html.head)}</head>
<body ${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body>
</html>`;
}
async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(`<style>${style}</style>`);
      }
    }
  }
  return Array.from(inlinedStyles).join("");
}
function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: ssrContext.event.node.res.statusCode,
    statusMessage: ssrContext.event.node.res.statusMessage,
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const attrs = [
    'type="application/json"',
    `id="${opts.id}"`,
    `data-ssr="${!(opts.ssrContext.noSSR)}"`,
    opts.src ? `data-src="${opts.src}"` : ""
  ].filter(Boolean);
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  return `<script ${attrs.join(" ")}>${contents}<\/script><script>window.__NUXT__={};window.__NUXT__.config=${uneval(opts.ssrContext.config)}<\/script>`;
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}

export { renderer as default };
//# sourceMappingURL=renderer.mjs.map
