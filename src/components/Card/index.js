import React, { useEffect } from "react";
import Router from "next/router";

import { Button } from "@material-tailwind/react";

import Location from "@/src/components/icons/Location";
import CalenderIcon from "@/src/components/icons/Calendar";
import Share from "@/src/components/icons/Share";
import People from "@/src/components/icons/People";
import Check from "@/src/components/icons/Check";

import ColorTag from "@/components/Tags/color-tag";
import LanguageTag from "@/components/Tags/language-tag";
import { formatDate } from "@/src/helpers";
import { Status } from "@/src/utils/constants";
import ShareOptions from "@/src/components/Share/share";
import Badge from "../Badge/Badge";

export default function Card({
  title,
  description,
  startDate,
  endDate,
  needOfVolunteer,
  applicants,
  checkedCertificates,
  checkedLanguages,
  checkedSkills,
  otherSkills,
  location,
  id,
  role = "volunteer",
  status = "",
}) {
  return (
    <div className="h-auto min-h-full border-2 border-gray-300 p-5">
      <div className="flex justify-between my-3 space-x-3">
        <div className="flex items-center space-x-1">
          <Location className="w-6 h-6" />
          <p className="text-sm"> {location}</p>
        </div>
        <div className="flex items-center space-x-1">
          <CalenderIcon className="w-6 h-6" />
          <p className="text-sm">
            {formatDate(startDate)} - {formatDate(endDate)}
          </p>
        </div>

        <div className="flex items-center space-x-1">
          <People className="w-6 h-6" />
          <p className="text-sm font-bold text-gray-500">{needOfVolunteer}</p>
        </div>
      </div>
      <hr />
      <div className="my-3">
        <div className="flex justify-between">
          <p className="text-xl font-bold my-10">{title}</p>
          <div className="mt-3">
            <ShareOptions id={id} />
          </div>
        </div>
        {status && (
          <Badge
            status={
              status === "approved"
                ? "success"
                : status === "pending"
                ? "info"
                : "danger"
            }
            text={Status[status]}
          />
        )}
        <p className="my-2">{description}</p>
        <p className="text-sm font-bold my-5">Aranan Yetkinlikler</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-2">
          {checkedSkills?.map((skill) => (
            <ColorTag text={skill} color="#FFDCDC" />
          ))}
          {otherSkills && <ColorTag text={otherSkills} color="#FFDCDC" />}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-2">
          {checkedLanguages?.map((language) => (
            <LanguageTag text={language} />
          ))}
        </div>
        {checkedCertificates?.includes("Ehliyet") && (
          <div className="flex items-center my-5">
            <p>Ehliyet</p>
            <Check className="w-6 h-6 mx-2" />
          </div>
        )}
      </div>
      <div className="flex justify-end items-center space-x-2 my-2">
        <p className="text-xs text-blue-gray-500">
          {applicants?.length > 0
            ? applicants?.length + " gönüllü başvurdu."
            : "İlk adımı sen at!"}
        </p>
        <Button color="pink" onClick={() => Router.push(`/${id}`)}>
          {role === "volunteer" && !status ? "BEN YAPARIM!" : "DETAYA GİT"}
        </Button>
      </div>
    </div>
  );
}
