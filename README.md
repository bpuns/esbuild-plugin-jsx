# 介绍

给vue3使用的jsx/tsx插件


# 使用

```js
import { build } from 'esbuild'
import vueJsx from 'esbuild-plugin-jsx'

build({
    ......
    plugins: [
        vueJsx()
    ]
})
```

