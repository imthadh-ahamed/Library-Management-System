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
  Input
} from "../UI/Index";

const Home: FC = () => {
  // State for modal open/close
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // Function to validate form inputs
  const validate = () => {
    // Create a new object to store the errors
    const newErrors: {
      title?: string;
      author?: string;
      description?: string;
    } = {};
    if (!title) newErrors.title = "Title is required";
    if (!author) newErrors.author = "Author is required";
    if (!description) newErrors.description = "Description is required";
    //  Return the new errors object
    return newErrors;
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Validate the form inputs
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      //  Set the errors state if there are validation errors
      setErrors(validationErrors);
    } else {
      // Handle form submission
      console.log("Form submitted", { title, author, description });
      // Close the modal after submission
      setIsModalOpen(false);
    }
  };

  // Function to close the modal
  const closeModal = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Section for Title and Create Button */}
          <section className="flex items-center justify-between">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Book Collections</h2>
            </div>
            <div>
              <GreenButton onClick={() => setIsModalOpen(true)}>
                Create
              </GreenButton>
            </div>
          </section>

          {/* Table Section */}
          <div className="border rounded-lg overflow-hidden">
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
                {/* Row 1 */}
                <TableRow>
                  <TableCell className="font-medium">
                    The Great Gatsby
                  </TableCell>
                  <TableCell>F. Scott Fitzgerald</TableCell>
                  <TableCell>A novel about the Roaring Twenties.</TableCell>
                  <TableCell className="text-right">
                    <BlueButton className="m-1">Edit</BlueButton>
                    <RedButton className="m-1">Delete</RedButton>
                  </TableCell>
                </TableRow>

                {/* Row 2 */}
                <TableRow>
                  <TableCell className="font-medium">
                    To Kill a Mockingbird
                  </TableCell>
                  <TableCell>Harper Lee</TableCell>
                  <TableCell>
                    A story of racial injustice in the American South.
                  </TableCell>
                  <TableCell className="text-right">
                    <BlueButton className="m-1">Edit</BlueButton>
                    <RedButton className="m-1">Delete</RedButton>
                  </TableCell>
                </TableRow>

                {/* Row 3 */}
                <TableRow>
                  <TableCell className="font-medium">1984</TableCell>
                  <TableCell>George Orwell</TableCell>
                  <TableCell>
                    A dystopian novel about a totalitarian society.
                  </TableCell>
                  <TableCell className="text-right">
                    <BlueButton className="m-1">Edit</BlueButton>
                    <RedButton className="m-1">Delete</RedButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      <Footer />

      {/* Modal for Create Form */}
      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">Create New Book</h2>
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
            Create
          </RedButton>
        </form>
      </CustomModal>
    </div>
  );
};

export default Home;
