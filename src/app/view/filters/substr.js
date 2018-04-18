





exports.substring = {
    read: (value,len) => {
        if (value && value.length > len)
            value = value.substring(0, len) + '...';
        return value;
    }
}


