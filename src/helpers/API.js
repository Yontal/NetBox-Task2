export const pullPersons = () => {
    const promise = new Promise((resolve, reject) => {
        fetch('https://frontend-test.netbox.ru/', { method: 'POST'})
            .then(res => {
                return res.json();
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => {reject(err)});
        }
    );
    return promise;
}

export const deletePersonById = (id) => {
    const promise = new Promise((resolve, reject) => {
        fetch(`https://frontend-test.netbox.ru/?method=delete&id=${id}`, { 
            method: 'GET',
        })
            .then(res => {
                if(res.ok){
                    return res.json();
                } else {
                    reject('Deletion failed' + res)
                }
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => {reject(err)});
        }
    );
    return promise;
}

export const updatePerson = (person) => {
    const promise = new Promise((resolve, reject) => {
        fetch(`https://frontend-test.netbox.ru/?method=update&id=${person.id}&name=${person.name}&age=${person.age}&phone=${person.phone}&email=${person.email}`, { 
            method: 'GET',
        })
            .then(res => {
                if(res.ok){
                    return res.json();
                } else {
                    reject('Update failed' + res)
                }
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => {reject(err)});
        }
    );
    return promise;
}

export const addPerson = (person) => {
    const promise = new Promise((resolve, reject) => {
        fetch(`https://frontend-test.netbox.ru/?method=add&name=${person.name}&age=${person.age}&phone=${person.phone}&email=${person.email}`, { 
            method: 'GET',
        })
            .then(res => {
                if(res.ok){
                    return res.json();
                } else {
                    reject('Add failed' + res)
                }
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => {reject(err)});
        }
    );
    return promise;
}