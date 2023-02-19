const TagRepository = require('../repository/TagRepository')

const getAllTags = () => {
    try {
        const tags = TagRepository.findAllTags()
        return tags
    } catch (error) {
        console.log(error)
    }
}

const getTagById = (id) => {
    try {
        const tag = TagRepository.findTagById(id)
        return tag
    } catch (error) {
        console.log(error)
    }
}

const createTag = (tag) => {
    try {
        const newTag = TagRepository.createTag(tag)
        return newTag
    } catch (error) {
        console.log(error)
    }
}

const updateTag = (id, tag) => {
    try {
        const updateTag = TagRepository.updateTag(id, tag)
        return updateTag
    } catch (error) {
        console.log(error)
    }
}

const deleteTag = (id) => {
    try {
        const deleteTag = TagRepository.deleteTag(id)
        return deleteTag
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag,
}
