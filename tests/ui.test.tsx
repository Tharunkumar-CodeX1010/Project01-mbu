// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import {
  Button,
  Drawer,
  Modal,
  SearchBar,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ToastProvider,
  useToast,
} from "@/components/ui";

describe("Button", () => {
  it("applies base button semantics and honors disabled state", () => {
    render(<Button disabled>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeDisabled();
  });

  it("renders an anchor when an href is provided", () => {
    render(<Button href="/recipes">View</Button>);
    expect(screen.getByRole("link", { name: "View" })).toHaveAttribute(
      "href",
      "/recipes"
    );
  });
});

describe("Modal", () => {
  it("is an accessible dialog that traps and restores focus, closes on Escape", async () => {
    const user = userEvent.setup();
    const ModalHarness = () => {
      const [open, setOpen] = useState(true);
      return (
        <Modal open={open} onOpenChange={setOpen} title="Confirm" description="Please confirm.">
          <button>Action</button>
        </Modal>
      );
    };

    render(<ModalHarness />);

    const dialog = await screen.findByRole("dialog", { name: "Confirm" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-describedby");
    expect(dialog.contains(document.activeElement)).toBe(true);

    await user.keyboard("{Tab}");
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Action" }));

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("Drawer", () => {
  it("renders a labelled dialog panel", async () => {
    render(
      <Drawer open onOpenChange={() => {}} title="Kitchen" side="right">
        <p>Content</p>
      </Drawer>
    );
    expect(await screen.findByRole("dialog", { name: "Kitchen" })).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});

describe("Tabs", () => {
  it("switches panels on click and via arrow keys", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="a">
        <TabsList aria-label="Sections">
          <TabsTrigger value="a">Overview</TabsTrigger>
          <TabsTrigger value="b">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Overview panel</TabsContent>
        <TabsContent value="b">Details panel</TabsContent>
      </Tabs>
    );

    const tabA = screen.getByRole("tab", { name: "Overview" });
    const tabB = screen.getByRole("tab", { name: "Details" });
    expect(tabA).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Overview panel")).toBeVisible();
    expect(screen.queryByText("Details panel")).not.toBeInTheDocument();

    tabA.focus();
    await user.keyboard("{ArrowRight}");
    expect(tabB).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Details panel")).toBeVisible();
    expect(screen.queryByText("Overview panel")).not.toBeInTheDocument();
  });
});

describe("SearchBar", () => {
  it("submits the trimmed query on the form", async () => {
    const user = userEvent.setup();
    let submitted = "";
    render(<SearchBar onSearch={(q) => (submitted = q)} />);
    await user.type(screen.getByRole("searchbox"), "  pizza  ");
    await user.click(screen.getByRole("button", { name: "Search" }));
    expect(submitted).toBe("pizza");
  });
});

describe("ToastProvider", () => {
  it("shows and dismisses toasts", async () => {
    const user = userEvent.setup();
    function Trigger() {
      const { toast } = useToast();
      return (
        <button onClick={() => toast({ title: "Added to favorites" })}>Add</button>
      );
    }
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>
    );

    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(await screen.findByText("Added to favorites")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Dismiss notification" }));
    expect(screen.queryByText("Added to favorites")).not.toBeInTheDocument();
  });
});