import { visit } from 'unist-util-visit'

const re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g

function rehypeMetaAsProperties() {
    return (tree) => {
        visit(tree, 'element', (node) => {
            let match
      
            if (node.tagName === 'code' && node.data && node.data.meta) {
              re.lastIndex = 0 // Reset regex.
      
              while ((match = re.exec(node.data.meta))) {
                node.properties[match[1]] = match[2] || match[3] || match[4] || ''
              }
            }
        })
    }
  }

export default rehypeMetaAsProperties