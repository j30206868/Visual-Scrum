-- phpMyAdmin SQL Dump
-- version 2.10.3
-- http://www.phpmyadmin.net
-- 
-- 主機: localhost
-- 建立日期: Feb 07, 2014, 04:59 AM
-- 伺服器版本: 5.0.51
-- PHP 版本: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- 資料庫: `visualscrum`
-- 

-- --------------------------------------------------------

-- 
-- 資料表格式： `epic`
-- 

CREATE TABLE `epic` (
  `eid` varchar(10) NOT NULL,
  `ename` varchar(30) default NULL,
  `projectid` varchar(10) default NULL,
  `state` tinyint(4) default NULL,
  `style` varchar(200) default NULL,
  `description` text,
  PRIMARY KEY  (`eid`),
  KEY `idx_epic` (`projectid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 
-- 列出以下資料庫的數據： `epic`
-- 


-- --------------------------------------------------------

-- 
-- 資料表格式： `milestone`
-- 

CREATE TABLE `milestone` (
  `mid` varchar(10) NOT NULL,
  `projectid` varchar(10) default NULL,
  `mtime` datetime default NULL,
  `hinttime` datetime default NULL,
  `filename` varchar(100) default NULL,
  PRIMARY KEY  (`mid`),
  KEY `idx_milestone` (`projectid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 
-- 列出以下資料庫的數據： `milestone`
-- 


-- --------------------------------------------------------

-- 
-- 資料表格式： `post`
-- 

CREATE TABLE `post` (
  `pid` varchar(20) NOT NULL,
  `posteruid` varchar(10) default NULL,
  `posttime` datetime default NULL,
  `title` varchar(100) default NULL,
  `content` text,
  `superpostid` varchar(20) default NULL,
  PRIMARY KEY  (`pid`),
  KEY `idx_post` (`posteruid`),
  KEY `idx_post_0` (`superpostid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 
-- 列出以下資料庫的數據： `post`
-- 


-- --------------------------------------------------------

-- 
-- 資料表格式： `postnotice`
-- 

CREATE TABLE `postnotice` (
  `pid` varchar(20) NOT NULL,
  `uid` varchar(20) NOT NULL,
  `state` tinyint(4) default NULL,
  PRIMARY KEY  (`pid`,`uid`),
  KEY `idx_postnotice_1` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='No.';

-- 
-- 列出以下資料庫的數據： `postnotice`
-- 


-- --------------------------------------------------------

-- 
-- 資料表格式： `postobject`
-- 

CREATE TABLE `postobject` (
  `pid` varchar(20) NOT NULL,
  `objectid` varchar(20) NOT NULL,
  `objtype` tinyint(4) NOT NULL,
  PRIMARY KEY  (`pid`,`objectid`,`objtype`),
  KEY `idx_postobject_0` (`objectid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Objtype';

-- 
-- 列出以下資料庫的數據： `postobject`
-- 


-- --------------------------------------------------------

-- 
-- 資料表格式： `project`
-- 

CREATE TABLE `project` (
  `projectid` varchar(10) NOT NULL,
  `owneruid` varchar(20) default NULL,
  `pname` varchar(100) default NULL,
  PRIMARY KEY  (`projectid`),
  KEY `idx_project` (`owneruid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 
-- 列出以下資料庫的數據： `project`
-- 


-- --------------------------------------------------------

-- 
-- 資料表格式： `projectbelong`
-- 

CREATE TABLE `projectbelong` (
  `projectid` varchar(10) NOT NULL,
  `uid` varchar(20) NOT NULL,
  `role` tinyint(4) default NULL,
  PRIMARY KEY  (`projectid`,`uid`),
  KEY `idx_projectbelong_1` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 
-- 列出以下資料庫的數據： `projectbelong`
-- 


-- --------------------------------------------------------

-- 
-- 資料表格式： `projectsetting`
-- 

CREATE TABLE `projectsetting` (
  `projectid` varchar(10) NOT NULL,
  `tasknotice` tinyint(4) default NULL,
  `createtime` datetime default NULL,
  PRIMARY KEY  (`projectid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 
-- 列出以下資料庫的數據： `projectsetting`
-- 


-- --------------------------------------------------------

-- 
-- 資料表格式： `task`
-- 

CREATE TABLE `task` (
  `tid` varchar(10) NOT NULL,
  `tname` varchar(30) default NULL,
  `eid` varchar(10) default NULL,
  `state` tinyint(4) default NULL,
  `style` varchar(200) default NULL,
  `num` tinyint(4) default NULL,
  `supertid` varchar(10) default NULL,
  `timetype` tinyint(4) default NULL,
  `starttime` datetime default NULL,
  `endtime` datetime default NULL,
  `hinttime` datetime default NULL,
  `scale` tinyint(4) default '2',
  `priority` int(11) default NULL,
  PRIMARY KEY  (`tid`),
  KEY `idx_task` (`eid`),
  KEY `idx_task_0` (`supertid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 
-- 列出以下資料庫的數據： `task`
-- 


-- --------------------------------------------------------

-- 
-- 資料表格式： `taskbelong`
-- 

CREATE TABLE `taskbelong` (
  `uid` varchar(20) NOT NULL,
  `tid` varchar(10) NOT NULL,
  `notice` tinyint(4) default NULL,
  PRIMARY KEY  (`uid`,`tid`),
  KEY `idx_taskbelong_1` (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='No"\n';

-- 
-- 列出以下資料庫的數據： `taskbelong`
-- 


-- --------------------------------------------------------

-- 
-- 資料表格式： `user`
-- 

CREATE TABLE `user` (
  `uid` varchar(20) NOT NULL,
  `pass` varchar(20) default NULL,
  `name` varchar(30) default NULL,
  `utype` tinyint(4) default NULL,
  PRIMARY KEY  (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 
-- 列出以下資料庫的數據： `user`
-- 


-- --------------------------------------------------------

-- 
-- 資料表格式： `usersetting`
-- 

CREATE TABLE `usersetting` (
  `uid` varchar(20) NOT NULL,
  `specialnotice` tinyint(4) default NULL,
  PRIMARY KEY  (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 
-- 列出以下資料庫的數據： `usersetting`
-- 


-- 
-- 備份資料表限制
-- 

-- 
-- 資料表限制 `epic`
-- 
ALTER TABLE `epic`
  ADD CONSTRAINT `fk_epic` FOREIGN KEY (`projectid`) REFERENCES `project` (`projectid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- 
-- 資料表限制 `milestone`
-- 
ALTER TABLE `milestone`
  ADD CONSTRAINT `fk_milestone` FOREIGN KEY (`projectid`) REFERENCES `project` (`projectid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- 
-- 資料表限制 `post`
-- 
ALTER TABLE `post`
  ADD CONSTRAINT `fk_post_0` FOREIGN KEY (`posteruid`) REFERENCES `user` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_post` FOREIGN KEY (`posteruid`) REFERENCES `user` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_post_post` FOREIGN KEY (`superpostid`) REFERENCES `post` (`pid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- 
-- 資料表限制 `postnotice`
-- 
ALTER TABLE `postnotice`
  ADD CONSTRAINT `fk_postnotice` FOREIGN KEY (`pid`) REFERENCES `post` (`pid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_postnotice_0` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- 
-- 資料表限制 `postobject`
-- 
ALTER TABLE `postobject`
  ADD CONSTRAINT `fk_postobject` FOREIGN KEY (`objectid`) REFERENCES `task` (`tid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_postobject_0` FOREIGN KEY (`objectid`) REFERENCES `epic` (`eid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_postobject_1` FOREIGN KEY (`pid`) REFERENCES `post` (`pid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_postobject_2` FOREIGN KEY (`objectid`) REFERENCES `user` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_postobject_3` FOREIGN KEY (`objectid`) REFERENCES `project` (`projectid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- 
-- 資料表限制 `project`
-- 
ALTER TABLE `project`
  ADD CONSTRAINT `fk_project` FOREIGN KEY (`owneruid`) REFERENCES `user` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- 
-- 資料表限制 `projectbelong`
-- 
ALTER TABLE `projectbelong`
  ADD CONSTRAINT `fk_projectbelong` FOREIGN KEY (`projectid`) REFERENCES `project` (`projectid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_projectbelong_0` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- 
-- 資料表限制 `projectsetting`
-- 
ALTER TABLE `projectsetting`
  ADD CONSTRAINT `fk_projectsetting` FOREIGN KEY (`projectid`) REFERENCES `project` (`projectid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- 
-- 資料表限制 `task`
-- 
ALTER TABLE `task`
  ADD CONSTRAINT `fk_task_0` FOREIGN KEY (`supertid`) REFERENCES `task` (`tid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_task` FOREIGN KEY (`eid`) REFERENCES `epic` (`eid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- 
-- 資料表限制 `taskbelong`
-- 
ALTER TABLE `taskbelong`
  ADD CONSTRAINT `fk_taskbelong` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_taskbelong_0` FOREIGN KEY (`tid`) REFERENCES `task` (`tid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- 
-- 資料表限制 `usersetting`
-- 
ALTER TABLE `usersetting`
  ADD CONSTRAINT `fk_usersetting` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION;
