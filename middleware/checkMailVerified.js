function checkMailVerified(req, res, next) {
    if (req.user.isEmailVerified) {
        next()
        return
    }
    // next()
    res.json({
        status: "failed",
        msg: "Please verify your mail and come back your review will be safe here."
    });
    return;
}

module.exports = checkMailVerified;