
export const errhandler = (err) => {
    console.log(err);
    let toastMsg = { serverity: '', summary: '', msg: '' }
    if (err?.response &&
        err?.response.data &&
        err?.response.data.message
    ) {
        toastMsg.msg = err.response.data.message
        toastMsg.serverity = 'error'
        toastMsg.summary = 'Error'
    } else {
        toastMsg.msg = 'Something went wrong. Please try again'
        toastMsg.serverity = 'error'
        toastMsg.summary = 'Error'
    }

    return toastMsg
}

