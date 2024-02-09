function loadFile<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText) as T);
        } else {
          reject(new Error('Failed to load file: ' + url));
        }
      }
    };
    xhr.send();
  });
}

export {loadFile};
