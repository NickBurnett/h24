import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../../lib/user/AuthContext';
import LoadIcon from '../../components/LoadIcon';
import { getFileExtension } from '../../lib/util';
import QRCode from '../../components/dashboardComponents/QRCode';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInImage from '@/public/icons/linkedin.png';
import ChickenImage from '@/public/assets/profile-chicken-egg.png';
import { TextField, TextFieldProps } from '@mui/material';
import Link from 'next/link';

/**
 * A page that allows a user to modify app or profile settings and see their data.
 *
 * Route: /profile
 */
export default function ProfilePage() {
  const router = useRouter();
  const { isSignedIn, hasProfile, user, profile } = useAuthContext();
  const [uploading, setUploading] = useState<boolean>(false);
  const resumeRef = useRef(null);

  useEffect(() => {
    if (hasProfile && !profile) window.location.reload();
  }, [profile]);

  const formatStudyLevel = (s: string) => {
    if (s === 'grad') return 'Graduate Student';
    return s.substring(0, 1).toUpperCase() + s.substring(1);
  };

  const formatRole = (s: string) => {
    return s
      .split('_')
      .map((w) => w.substring(0, 1).toUpperCase() + w.substring(1))
      .join(' ');
  };

  const textFieldOverrides: TextFieldProps = {
    InputLabelProps: {
      classes: {
        root: '!text-black',
      },
    },
    InputProps: {
      classes: {
        input: '!text-black [-webkit-text-fill-color:unset!important]',
        notchedOutline: '!border-[#79747E]',
      },
    },
  };

  const handleResumeUpload = (profile) => {
    if (resumeRef.current.files.length !== 1) return alert('Must submit one file');

    const fileExtension = getFileExtension(resumeRef.current.files[0].name);
    const acceptedFileExtensions = [
      '.pdf',
      '.doc',
      '.docx',
      '.png',
      '.jpg',
      '.jpeg',
      '.txt',
      '.tex',
      '.rtf',
    ];

    if (!acceptedFileExtensions.includes(fileExtension))
      return alert(`Accepted file types: ${acceptedFileExtensions.join(' ')}`);

    const resumeFile = resumeRef.current.files[0];

    setUploading(true);

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('fileName', `${user.id}${fileExtension}`);
    formData.append('studyLevel', profile.studyLevel);
    formData.append('major', profile.major);

    fetch('/api/resume/upload', {
      method: 'post',
      body: formData,
    }).then((res) => {
      if (res.status !== 200) alert('Resume upload failed...');
      else {
        setUploading(false);
        alert('Resume updated...');
      }
    });
  };

  if (!isSignedIn) {
    return <div className="p-4 flex-grow text-center text-white">Sign in to see your profile!</div>;
  }

  if (!hasProfile) {
    router.push('/register');
    return <div></div>;
  }

  if (profile)
    return (
      <div className="md:py-16 py-12 text-black flex justify-center">
        <div className="bg-white min-w-3/4 py-12 px-16 rounded-xl flex flex-col md:flex-row 2xl:gap-x-14 gap-x-12 2xl:justify-center">
          {/* QR Code */}
          <div className="">
            <div className="bg-[#E0FDFF] rounded-lg p-8 h-min w-min mx-auto">
              {/* Dark represents dots, Light represents the background */}
              <QRCode
                data={'hack:' + user.id}
                loading={false}
                width={200}
                height={200}
                darkColor="#173950"
                lightColor="#0000"
              />
              <div className="text-center text-[#170F49] text-md font-semibold">
                {profile?.user.group ? profile?.user.group : 'Group TBD'}
              </div>
            </div>
            <div className="border-y-[1.2px] border-primaryDark/20 py-4 md:my-8 my-6">
              <div className="font-fredoka font-semibold text-lg">Application Status</div>

              <h1
                className={`font-fredoka text-xl font-semibold ${
                  profile?.status === 'Accepted'
                    ? 'text-[#5DC55B]'
                    : profile?.status === 'Rejected'
                    ? 'text-[#DE3163]'
                    : 'text-[#5C67C9]'
                }`}
              >
                {profile?.status ? profile?.status : 'In Review'}
              </h1>
              <Link
                href="/profile/application/edit"
                className="text-[#40B7BA] font-bold underline text-sm"
              >
                Edit Application
              </Link>
            </div>

            <div className="flex gap-x-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full">
                <a href={profile?.linkedin} target="_blank" rel="noreferrer">
                  <Image
                    alt="LinkedIn"
                    src={LinkedInImage.src}
                    width={LinkedInImage.width}
                    height={LinkedInImage.height}
                  />
                </a>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full">
                <a href={profile?.github} target="_blank" rel="noreferrer">
                  <GitHubIcon className="!w-10 !h-10" />
                </a>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full">
                <a href={profile?.website} target="_blank" rel="noreferrer">
                  <LanguageRoundedIcon className="text-[#5C67C9] !w-10 !h-10" />
                </a>
              </div>

              <div className="my-2">
                {!uploading ? (
                  <>
                    <input
                      id="resume"
                      style={{ display: 'none' }}
                      type="file"
                      ref={resumeRef}
                      onChange={() => handleResumeUpload(profile)}
                      accept=".pdf, .doc, .docx, image/png, image/jpeg, .txt, .tex, .rtf"
                    />
                    <label
                      id="resume_label"
                      className="font-fredoka transition py-3 font-semibold px-6 text-sm text-center whitespace-nowrap text-white w-min bg-[#40B7BA] rounded-full cursor-pointer hover:brightness-110"
                      htmlFor="resume"
                    >
                      Resume
                    </label>
                  </>
                ) : (
                  <LoadIcon width={16} height={16} />
                )}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="w-full">
            <h1 className="text-center font-fredoka font-semibold text-5xl md:mt-0 mt-10 text-[#40B7BA]">{`${profile?.user.firstName} ${profile?.user.lastName}`}</h1>

            <div className="w-full grid gap-8 grid-cols-1 md:grid-cols-2 mt-8">
              <TextField
                className="col-span-1"
                disabled
                label="University"
                value={profile?.university}
                {...textFieldOverrides}
              />
              <TextField
                className="col-span-1"
                disabled
                label="Major"
                value={profile?.major}
                {...textFieldOverrides}
              />
              <TextField
                className="col-span-1"
                disabled
                label="Role"
                value={profile && formatRole(profile?.user.permissions[0])}
                {...textFieldOverrides}
              />
              <TextField
                className="col-span-1"
                disabled
                label="Number of hackathons attended"
                value={profile?.hackathonExperience}
                {...textFieldOverrides}
              />
              <TextField
                className="col-span-2"
                disabled
                label="Current level of study"
                value={profile && formatStudyLevel(profile?.studyLevel)}
                {...textFieldOverrides}
              />
              <TextField
                className="col-span-2"
                disabled
                label="Preferred email"
                value={profile?.user.preferredEmail}
                {...textFieldOverrides}
              />
            </div>
          </div>
        </div>
      </div>
    );
}
