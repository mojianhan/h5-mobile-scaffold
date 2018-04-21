const xhr = new XMLHttpRequest()

function buildParam(prefix, obj, add) {
  if (Array.isArray(obj)) {
    obj.forEach((value, index) => {
      if (/\[\]$/.test(prefix)) {
        add(prefix, value)
      } else {
        buildParam(prefix + '[' + (typeof value === 'object' && value != null ? index : '') + ']', value, add)
      }
    })
  } else if (typeof obj === 'object') {
    for (const name in obj) {
      buildParam(prefix + '[' + name + ']', obj[name], add)
    }
  } else {
    add(prefix, obj)
  }
}

function formatParam(data) {
  const s = []

  if (Array.isArray(data)) {
    data.forEach((value, key) => {
      add(key, value)
    })
  } else {
    for (const prefix in data) {
      buildParam(prefix, data[prefix], add)
    }
  }

  function add(key, valueOfFunction) {
    const value = typeof valueOfFunction === 'function' ? valueOfFunction() : valueOfFunction
    s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value == null ? '' : value)
  }

  return s.join('&')
}

function ajax({ url = '', method = 'GET', data = {} } = {}) {

}

export default ajax
