import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { initEdgeStore } from '@edgestore/server';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
    myPublicImages: es.imageBucket().beforeDelete(({ ctx, fileInfo }) => {
        return true;
    }),
    myPublicXlsxFiles: es.fileBucket().beforeDelete(({ ctx, fileInfo }) => {
        return true;
    }),
});

const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
});

export { handler as GET, handler as POST };
export type EdgeStoreRouter = typeof edgeStoreRouter;
