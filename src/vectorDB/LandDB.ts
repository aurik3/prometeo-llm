import * as fsOld from 'node:fs';
import * as fs from 'node:fs/promises';
import similarity from 'compute-cosine-similarity';
import { Table, connect } from '@lancedb/lancedb';



import { BaseDb } from '@llm-tools/embedjs';
import { ExtractChunkData, InsertChunkData } from '@llm-tools/embedjs/dist/global/types';

export class LanceDb implements BaseDb {
    private static readonly STATIC_DB_NAME = 'vectors';
    private readonly isTemp: boolean;
    private readonly path: string;
    private table: typeof Table;

    constructor({ path, isTemp }: { path: string; isTemp?: boolean }) {
        this.isTemp = isTemp ?? false; // Usar nullish coalescing para mayor claridad
        this.path = path;
    }

    async init({ dimensions }: { dimensions: number }): Promise<void> {
        if (!this.isTemp && !fsOld.existsSync(this.path)) {
            await fs.mkdir(this.path);
        }

        const dir = this.isTemp ? await fs.mkdtemp(this.path) : this.path;
        const client = await connect(dir);

        const list = await client.tableNames();
        if (list.includes(LanceDb.STATIC_DB_NAME)) {
            this.table = await client.openTable(LanceDb.STATIC_DB_NAME);
        } else {
            this.table = await client.createTable(LanceDb.STATIC_DB_NAME, [
                {
                    id: 'md5',
                    pageContent: 'sample',
                    vector: new Array(dimensions),
                    uniqueLoaderId: 'sample',
                    vectorString: 'sample',
                    metadata: 'sample',
                },
            ]);
        }
    }

    async insertChunks(chunks: InsertChunkData[]): Promise<number> {
        const mapped = chunks.map(chunk => {
            const { uniqueLoaderId, ...metadata } = chunk.metadata; // Destructuración para mayor claridad

            return {
                id: chunk.metadata.id,
                pageContent: chunk.pageContent,
                vector: chunk.vector,
                uniqueLoaderId,
                metadata: JSON.stringify(metadata),
                vectorString: JSON.stringify(chunk.vector),
            };
        });

        await this.table.add(mapped);
        return mapped.length; // TODO: verificar si vectorDb aborda el problema donde add devuelve undefined
    }

    async similaritySearch(query: number[], k: number): Promise<ExtractChunkData[]> {
        const results = await this.table.search(query).limit(k).toArray();

        return results
            .filter((entry: { id: string; }) => entry.id !== 'md5') // Filtrar la entrada no deseada
            .map((result: { metadata: string; vectorString: string; uniqueLoaderId: any; pageContent: string; }) => {
                const metadata = JSON.parse(result.metadata as string);
                const vector = JSON.parse(result.vectorString as string);
                metadata.uniqueLoaderId = result.uniqueLoaderId;

                return {
                    score: similarity(query, vector),
                    pageContent: result.pageContent as string,
                    metadata,
                };
            });
    }

    async getVectorCount(): Promise<number> {
        return this.table.countRows();
    }

    async deleteKeys(uniqueLoaderId: string): Promise<boolean> {
        await this.table.delete(`\`uniqueLoaderId\` = "${uniqueLoaderId}"`);
        return true;
    }

    async reset(): Promise<void> {
        await this.table.delete('id IS NOT NULL');
    }
}
