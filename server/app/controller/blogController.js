const BlogModel = require('../model/blog');
const mongoose = require('mongoose');

class BlogController {

    // Add Blog
    async addBlog(req, res) {
        try {
            const authorId = req.author._id
            // Image Path Validation
            if (!req.file) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: ["Blog image is required"]
                });
            }
            const blogdata = new BlogModel({ ...req.body, authorId: authorId, image: req.file.path });
            const data = await blogdata.save();
            res.status(200).json({ success: true, message: "Blog posted successfully", data });
        } catch (error) {
            const statusCode = error.name === 'ValidationError' ? 400 : 500;
            const message = error.name === 'ValidationError'
                ? { message: "Validation error", errors: Object.values(error.errors).map(err => err.message) }
                : { message: "Error updating todo data" };

            console.error(error);
            res.status(statusCode).json(message);
        }
    }

    // Show Blog
    async blogList(req, res) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = 2
            const totalData = await BlogModel.countDocuments();
            const totalPage = Math.ceil(totalData / limit)
            const nextPage = totalPage > page ? page + 1 : null
            const prevPage = page > 1 ? page - 1 : null
            const blogs = await BlogModel.aggregate([
                {
                    $lookup: {
                        from: "authors",
                        localField: "authorId",
                        foreignField: "_id",
                        as: "authorDetails"
                    }
                },
                {
                    $skip: (page - 1) * limit
                },
                {
                    $limit: limit
                },
                {
                    $unwind: '$authorDetails'
                }
            ]);
            res.status(200).json({
                message: "Data get sucessfully",
                blogs,
                pagination: {
                    page,
                    prevPage,
                    nextPage,
                    totalPage,
                    totalData,
                }
            })
        } catch (error) {
            console.log("Error get data...", error);
        }
    }

    // Single blog
    async singleBlog(req, res) {
        try {
            const id = req.params.id
            const blog = await BlogModel.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(id) }
                },
                {
                    $lookup: {
                        from: "authors", // Ensure "authors" matches the actual collection name
                        localField: "authorId",
                        foreignField: "_id",
                        as: "authorDetails",
                    },
                },
                {
                    $unwind: { path: "$authorDetails", preserveNullAndEmptyArrays: true }
                }
            ]);
            res.status(200).json({ message: "Single blog fetched", blog })
        } catch (error) {
            console.log("Error fetching Blog...", error)
        }
    }

    // Get author wise blog
    async authorwiseBlog(req, res) {
        const authorId = req.author._id; // Extract authorId from the URL
        console.log("User.... ID:", authorId);
        try {
            const blogs = await BlogModel.aggregate([
                {
                    $match: { authorId: new mongoose.Types.ObjectId(authorId) }
                },
                {
                    $lookup: {
                        from: "authors",
                        localField: "authorId",
                        foreignField: "_id",
                        as: "authorDetails",
                    },
                },
                {
                    $unwind: { path: "$authorDetails", preserveNullAndEmptyArrays: true }
                }
            ]);
            if (blogs.length > 0) {
                res.status(200).json({
                    message: "Blog list fetched successfully",
                    total: blogs.length,
                    blogs,
                });
            } else {
                res.status(404).json({ message: "No blogs found for this author" });
            }
        } catch (error) {
            console.error("Error fetching blogs by author:", error);
            res.status(500).json({ message: "Error retrieving blog data" });
        }
    }

    // Recent Blog
    async recentBlog(req, res) {
        const blogs = await BlogModel.find().sort({ createdAt: -1 });
        res.status(200).json({ message: "Recent blog fetched", blogs })
    }

    // Add comment for blog
    async addComment(req, res) {
        const id = req.params.id;
        try {
            const commentData = req.body
            const username = req.author.name
            const useremail = req.author.email
            const userimage = req.author.image
            console.log("Comment data", commentData)
            const blog = await BlogModel.findById(id);
            blog.comments.push({ ...commentData, name: username, email: useremail, image: userimage });
            blog.save()
            res.status(201).json({
                success: true,
                message: "Comment added successfully",
                blog
            });
        } catch (error) {
            const statusCode = error.name === 'ValidationError' ? 400 : 500;
            const message = error.name === 'ValidationError'
                ? { message: "Validation error", errors: Object.values(error.errors).map(err => err.message) }
                : { message: "Error updating student data" };

            console.error(error);
            res.status(statusCode).json(message);
        }
    }

    // Show comment 
    async showComment(req, res) {
        const id = req.params.id;
        try {
            const blog = await BlogModel.findById(id)
            res.status(200).json({ sucess: true, message: "Comment fetching successfully", blog })
        } catch (error) {
            res.status(500).json({ success: false, message: "Error fetching comment", error });
        }
    }

}
module.exports = new BlogController()






