const cleanProperties = (allowed_properties, req, res, next) => {
    const clean_json = {}
    Object.keys(req.body).forEach(
        property =>
            allowed_properties[property] &&
            (clean_json[property] = req.body[property])
    );
    req.body = clean_json;
    next();
}

module.exports = { cleanProperties };