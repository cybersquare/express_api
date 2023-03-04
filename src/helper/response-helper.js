const responseHelper = (response, body) => {
    let newbody = {};
    if (body.statusCode == 200 || body.statusCode == 201) {
        newbody.success = true;
    } else {
        newbody.success = false;
    }
    const finalBody = Object.assign(newbody, body);
    return response.status(body.statusCode).json(finalBody);
}

module.exports = responseHelper;
