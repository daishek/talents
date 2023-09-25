"use client";

import PageModal from "@/components/ui/page-modal";
import { useProfileModal } from "@/hooks/use-profile-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import tabs content
import General from "./partials/profile-general";
import Projects from "./partials/profile-projects";
import Contact from "./partials/profile-contact";
import {
  Contact as ContactType,
  Education as EducationType,
  Profile,
  Project,
  ProjectImage,
} from "@prisma/client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import Education from "./partials/profile-education";

type Tab = {
  id: string;
  label: string;
  content: React.ReactElement;
};

type ProfileProps = {
  general: Profile;
  projects: (Project & {
    images: ProjectImage[];
  })[];
  links: ContactType[];
  education: EducationType[];
};

const ProfileModal = ({
  general,
  projects,
  links,
  education,
}: ProfileProps) => {
  const profileModal = useProfileModal();
  const [mobileTabOpen, setMobileTabOpen] = useState(false);

  const tabs: Tab[] = [
    {
      id: "general",
      label: "General",
      content: <General initialData={general} />,
    },
    {
      id: "projects",
      label: "Projects",
      content: <Projects initialData={projects} />,
    },
    {
      id: "education",
      label: "Education",
      content: <Education initialData={education} />,
    },
    {
      id: "contact",
      label: "Contact",
      content: <Contact initialData={links} />,
    },
  ];
  return (
    <PageModal isOpen={profileModal.isOpen} onClose={profileModal.onClose}>
      <div className="h-[80vh] overflow-hidden">
        {mobileTabOpen && (
          <div className="sm:hidden">
            <Button
              size="icon"
              variant="link"
              onClick={() => setMobileTabOpen(false)}
            >
              <ChevronLeft className="h-4 w-4 " />{" "}
            </Button>
          </div>
        )}
        <Tabs defaultValue="general" className="h-full grid grid-cols-4">
          <TabsList
            className={cn(
              "col-span-4 sm:col-span-1 h-full flex-col justify-start bg-transparent pl-0 sm:pr-5 sm:border-r",
              mobileTabOpen && "hidden sm:flex"
            )}
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                onClick={() => setMobileTabOpen(true)}
                className="justify-start w-full data-[state=active]:bg-muted"
                value={tab.id}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div
            className={cn(
              "overflow-y-scroll no-scrollbar col-span-4 sm:col-span-3 sm:pl-5",
              !mobileTabOpen && "hidden sm:block"
            )}
          >
            {tabs.map((tab) => (
              <TabsContent className="h-full m-0" key={tab.id} value={tab.id}>
                {tab.content}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </PageModal>
  );
};

export default ProfileModal;
