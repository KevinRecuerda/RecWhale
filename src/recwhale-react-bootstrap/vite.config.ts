// vite.config.ts
import {defineConfig} from "vite";
import path           from "path";
// import react          from "@vitejs/plugin-react";
import dts            from "vite-dts";
// import dts            from "vite-plugin-dts";
// https://vitejs.dev/config/
export default defineConfig({
                                plugins: [dts()],
                                build:   {
                                    lib:           {
                                        entry:    path.resolve(__dirname, "src/index.ts"),
                                        name:     "recwhale-react-bootstrap",
                                        fileName: "index",
                                        formats: ['es']
                                    },
                                    rollupOptions: {
                                        external: ["react"],
                                        output:   {
                                            globals: {
                                                react: "react"
                                            }
                                        }
                                    }
                                }
                            });
