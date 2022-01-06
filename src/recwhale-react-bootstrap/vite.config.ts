// vite.config.ts
import {defineConfig} from "vite";
import path           from "path";
// import react          from "@vitejs/plugin-react";
// import dts            from "vite-plugin-dts";
// https://vitejs.dev/config/
export default defineConfig({
                                // plugins: [react()],
                                build: {
                                    lib: {
                                        entry:    path.resolve(__dirname, "src/index.ts"),
                                        name:     "recwhale-react-bootstrap",
                                        fileName: "index"
                                    },
                                    rollupOptions: {
                                        external: ["react"],
                                        output: {
                                            globals: {
                                                react: "react"
                                            }
                                        }
                                    }
                                }
                            });

// import tsconfigPaths from 'vite-tsconfig-paths' // can remove if you don't use ts config paths
// import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
// export default defineConfig({
//                                 // plugins: [dts()],
//                                 build:   {
//                                     lib:           {
//                                         entry:    path.resolve(__dirname, "src/index.ts"),
//                                         name:     "recwhale-react-bootstrap",
//                                         fileName: "index"
//                                     },
//                                     rollupOptions: {
//                                         external: ["react"],
//                                         output:   {
//                                             globals: {
//                                                 react: "react"
//                                             }
//                                         }
//                                     }
//                                 }
//                             });
