import { unified } from 'unified'
import remarkParse from 'remark-parse'
// import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

const remarkParser = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw as any)
  .use(rehypeStringify)

export default remarkParser
