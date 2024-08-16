import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { Header, Footer, CustomModal } from "../Components/index";
import {
  BlueButton,
  GreenButton,
  RedButton,
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Label,
  Input,
} from "../UI/Index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Book {
  bookId: number;
  title: string;
  author: string;
  description: string;
}

const Home: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    author?: string;
    description?: string;
  }>({});
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("https://localhost:7105/api/books/get")
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const validate = () => {
    const newErrors: { title?: string; author?: string; description?: string } =
      {};
    if (!title) newErrors.title = "Title is required";
    if (!author) newErrors.author = "Author is required";
    if (!description) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    isEditMode && editIndex !== null ? updateBook() : createBook();
    closeModal();
  };

  const createBook = () => {
    const newBook = { title, author, description };
    axios
      .post("https://localhost:7105/api/books/create", newBook)
      .then((response) => {
        setBooks([...books, response.data]);
        toast.success("Book created successfully!", {
          position: "bottom-left",
        });
      })
      .catch((error) => console.error("Error creating book:", error));
  };

  const updateBook = () => {
    if (editIndex !== null) {
      const updatedBook = { ...books[editIndex], title, author, description };
      axios
        .put(
          `https://localhost:7105/api/books/update/${updatedBook.bookId}`,
          updatedBook
        )
        .then((response) => {
          setBooks(books.map((b, i) => (i === editIndex ? response.data : b)));
          toast.success("Book updated successfully!", {
            position: "bottom-left",
          });
          window.location.reload(); // This line is typically not recommended; you might want to remove this and handle state updates locally
        })
        .catch((error) => console.error("Error updating book:", error));
    }
  };

  const handleEdit = (index: number) => {
    setIsEditMode(true);
    setEditIndex(index);
    setTitle(books[index].title);
    setAuthor(books[index].author);
    setDescription(books[index].description);
    setIsModalOpen(true);
  };

  const handleDelete = (index: number) => {
    setDeleteIndex(books[index].bookId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      axios
        .delete(`https://localhost:7105/api/books/delete/${deleteIndex}`)
        .then(() => {
          setBooks(books.filter((book) => book.bookId !== deleteIndex));
          toast.success("Book deleted successfully!", {
            position: "bottom-left",
          });
          closeDeleteModal();
        })
        .catch((error) => console.error("Error deleting book:", error));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditIndex(null);
    setTitle("");
    setAuthor("");
    setDescription("");
    setErrors({});
  };

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <section className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
            <h2 className="text-3xl font-bold text-center">Book Collections</h2>
            <GreenButton onClick={() => setIsModalOpen(true)}>
              Create
            </GreenButton>
          </section>
          <div className="border rounded-lg max-h-screen overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book, index) => (
                  <TableRow key={book.bookId}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.description}</TableCell>
                    <TableCell className="text-right">
                      <BlueButton
                        className="m-1"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </BlueButton>
                      <RedButton
                        className="m-1"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </RedButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      <Footer />

      {/* Modal for Create/Edit Form */}
      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Edit Book" : "Create New Book"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="mb-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author}</p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          <GreenButton type="submit" className="w-full">
            {isEditMode ? "Update" : "Create"}
          </GreenButton>
        </form>
      </CustomModal>

      {/* Modal for Delete Confirmation */}
      <CustomModal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal}>
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this book?</p>
        <div className="flex justify-end mt-4">
          <GreenButton className="mr-2" onClick={closeDeleteModal}>
            Cancel
          </GreenButton>
          <RedButton onClick={confirmDelete}>Confirm</RedButton>
        </div>
      </CustomModal>
    </div>
  );
};

export default Home;
