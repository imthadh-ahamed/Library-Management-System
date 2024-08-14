import { FC, useState } from "react";
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

const Home: FC = () => {
  // State for modal open/close
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to track if the form is in edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  // State for form title inputs
  const [title, setTitle] = useState("");
  // State for form author inputs
  const [author, setAuthor] = useState("");
  // State for form description inputs
  const [description, setDescription] = useState("");
  // State for form errors
  const [errors, setErrors] = useState<{
    title?: string;
    author?: string;
    description?: string;
  }>({});
  // State to track which book is being edited
  const [editIndex, setEditIndex] = useState<number | null>(null);
  // Dummy data for books
  const [books, setBooks] = useState([
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description: "A novel about the Roaring Twenties.",
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      description: "A story of racial injustice in the American South.",
    },
    {
      title: "1984",
      author: "George Orwell",
      description: "A dystopian novel about a totalitarian society.",
    },
  ]);

  // State for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  // Function to validate form inputs
  const validate = () => {
    const newErrors: {
      title?: string;
      author?: string;
      description?: string;
    } = {};
    if (!title) newErrors.title = "Title is required";
    if (!author) newErrors.author = "Author is required";
    if (!description) newErrors.description = "Description is required";
    return newErrors;
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    // Prevent default form submission
    e.preventDefault();
    // Reset errors
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
        // Set errors if there are any
      setErrors(validationErrors);
    } else {
        // If in edit mode, update the book details
      if (isEditMode && editIndex !== null) {
        // Update the book details
        const updatedBooks = [...books];
        updatedBooks[editIndex] = { title, author, description };
        // Set the updated books array
        setBooks(updatedBooks);
      } else {
        // Add a new book
        setBooks([...books, { title, author, description }]);
      }
      setIsModalOpen(false);
      setIsEditMode(false);
      setEditIndex(null);
      setTitle("");
      setAuthor("");
      setDescription("");
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setAuthor("");
    setDescription("");
    setIsEditMode(false);
    setEditIndex(null);
    setErrors({});
  };

  // Function to handle the Edit button click
  const handleEdit = (index: number) => {
    setIsEditMode(true);
    setEditIndex(index);
    setTitle(books[index].title);
    setAuthor(books[index].author);
    setDescription(books[index].description);
    setIsModalOpen(true);
  };

  // Function to handle the Delete button click
  const handleDelete = (index: number) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  // Function to confirm deletion
  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const updatedBooks = books.filter((_, index) => index !== deleteIndex);
      setBooks(updatedBooks);
      setIsDeleteModalOpen(false);
      setDeleteIndex(null);
    }
  };

  // Function to close the delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteIndex(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Section for Title and Create Button */}
          <section className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Book Collections</h2>
            </div>
            <div>
              <GreenButton
                onClick={() => {
                  setIsEditMode(false);
                  setIsModalOpen(true);
                }}
              >
                Create
              </GreenButton>
            </div>
          </section>

          {/* Table Section */}
          <div className="border rounded-lg max-h-screen overflow-y-auto">
            <Table className="">
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
                  <TableRow key={index}>
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
      <CustomModal
        // Pass the isOpen prop to open the modal
        isOpen={isModalOpen}
        // Pass the onRequestClose prop to close the modal
        onRequestClose={closeModal}
      >
        <h2 className="text-xl font-bold mb-4">
          {/* Change the modal title based on the mode */}
          {isEditMode ? "Edit Book" : "Create New Book"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author}</p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          <RedButton type="submit" className="w-full">
            {/* Change the button text based on the mode */}
            {isEditMode ? "Update" : "Create"}
          </RedButton>
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
